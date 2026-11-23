#!/usr/bin/env bash
# Dùng: MONGO_URI="mongodb://localhost:27017/learncode" ./import.sh
URI="${MONGO_URI:-mongodb://localhost:27017/learncode}"
for f in users categories courses chapters lessons orders payments enrollments quizzes questions quiz_results lesson_progress reviews; do
  mongoimport --uri "$URI" --collection "$f" --file "$f.json" --jsonArray --drop
done
