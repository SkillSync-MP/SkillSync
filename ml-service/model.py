import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SkillSyncModel:
    def __init__(self, csv_path=None):
        # CSV not needed anymore, but kept optional
        print("✅ ML Model Ready (MongoDB mode)")
        self.vectorizer = TfidfVectorizer(stop_words="english")

    # -----------------------------
    # ⚡ Availability scoring
    # -----------------------------
    def _availability_score(self, val):
        try:
            val = str(val)
            hours = int(val.split("-")[0].strip())
            return (hours / 20) * 50
        except:
            return 0

    # -----------------------------
    # 🔍 SEARCH FUNCTION
    # -----------------------------
    def search(self, query, users):
        if not query or not users:
            return []

        query = query.lower().strip()

        # Convert MongoDB users → DataFrame
        df = pd.DataFrame(users)

        # -----------------------------
        # 🔧 CLEANING
        # -----------------------------
        for col in ["name", "branch", "career_path", "known_skills", "learning_goal", "availability"]:
            if col in df.columns:
                df[col] = df[col].fillna("").astype(str).str.strip().str.lower()
            else:
                df[col] = ""

        # Fix passing year
        if "passing_year" in df.columns:
            df["passing_year"] = (
                df["passing_year"]
                .astype(str)
                .str.split("-")
                .str[0]
            )
            df["passing_year"] = pd.to_numeric(df["passing_year"], errors="coerce")
            df["passing_year"] = df["passing_year"].fillna(df["passing_year"].median())
        else:
            df["passing_year"] = 0

        # Combine text
        df["combined_skills"] = (
            df["career_path"] + " " +
            df["known_skills"] + " " +
            df["learning_goal"]
        )

        # -----------------------------
        # 🧠 TF-IDF
        # -----------------------------
        # tfidf_vectorizer = TfidfVectorizer(stop_words="english")
        # tfidf_matrix = tfidf_vectorizer.fit_transform(df["combined_skills"])
          
        # query_vector = tfidf_vectorizer.transform([query])
        self.vectorizer.fit(df["combined_skills"])
        tfidf_matrix = self.vectorizer.transform(df["combined_skills"])
        query_vector = self.vectorizer.transform([query])
        df["skill_score"] = cosine_similarity(query_vector, tfidf_matrix).flatten() * 100

        # -----------------------------
        # 🎯 SCORING
        # -----------------------------
        df["known_skills_score"] = df["known_skills"].apply(lambda x: 100 if query in x else 0)
        df["learning_goal_score"] = df["learning_goal"].apply(lambda x: 80 if query in x else 0)
        df["career_path_score"] = df["career_path"].apply(lambda x: 60 if query in x else 0)

        max_year = df["passing_year"].max()
        df["passing_year_score"] = df["passing_year"].apply(
            lambda x: (x / max_year) * 50 if max_year else 0
        )

        # Availability score
        df["availability_score"] = df["availability"].apply(self._availability_score)

        # -----------------------------
        # 🧮 FINAL SCORE
        # -----------------------------
        df["final_score"] = (
            df["skill_score"] * 0.4 +
            df["known_skills_score"] * 0.2 +
            df["learning_goal_score"] * 0.15 +
            df["career_path_score"] * 0.1 +
            df["passing_year_score"] * 0.1 +
            df["availability_score"] * 0.05
        )

        # Sort
        df = df.sort_values(by="final_score", ascending=False)

        # Remove duplicates
        if "name" in df.columns:
            df = df.drop_duplicates(subset=["name"], keep="first")

        # -----------------------------
        # ✅ RETURN RESULT
        # -----------------------------
        return df[["_id", "name", "final_score"]].head(10).to_dict(orient="records")
    

    # SEARCHING FROM CSV FILE
    # def search(self, query):
    #     if not query:
    #         return []

    #     query = query.lower().strip()
    #     df = self.df.copy()

    #     # 🎯 1. Name match (highest priority)
    #     name_match = df[df["name"].str.contains(query, case=False, na=False)]
    #     if not name_match.empty:
    #         return name_match[["user_id", "name"]].head(10).to_dict(orient="records")

    #     # 🎯 2. TF-IDF similarity
    #     query_vector = self.tfidf_vectorizer.transform([query])
    #     df["skill_score"] = cosine_similarity(query_vector, self.tfidf_matrix).flatten() * 100

    #     # 🎯 3. Exact matches
    #     df["known_skills_score"] = df["known_skills"].apply(
    #         lambda x: 100 if query in x else 0
    #     )

    #     df["learning_goal_score"] = df["learning_goal"].apply(
    #         lambda x: 80 if query in x else 0
    #     )

    #     df["career_path_score"] = df["career_path"].apply(
    #         lambda x: 60 if query in x else 0
    #     )

    #     # 🎯 4. Passing year score (recent = higher)
    #     max_year = df["passing_year"].max()
    #     df["passing_year_score"] = df["passing_year"].apply(
    #         lambda x: (x / max_year) * 50 if max_year else 0
    #     )

    #     # 🎯 5. Availability score
    #     df["availability_score"] = df["availability"].apply(self._availability_score)

    #     # -----------------------------
    #     # 🧮 FINAL SCORE
    #     # -----------------------------
    #     df["final_score"] = (
    #         df["skill_score"] * 0.4 +
    #         df["known_skills_score"] * 0.2 +
    #         df["learning_goal_score"] * 0.15 +
    #         df["career_path_score"] * 0.1 +
    #         df["passing_year_score"] * 0.1 +
    #         df["availability_score"] * 0.05
    #     )

    #     # Sort results
    #     df = df.sort_values(by="final_score", ascending=False)

    #     # Remove duplicates
    #     df = df.drop_duplicates(subset=["name"], keep="first")

    #     # If no useful results
    #     if df["final_score"].max() == 0:
    #         return []

    #     # Return top 10
    #     return df[["user_id", "name", "final_score"]].head(10).to_dict(orient="records")