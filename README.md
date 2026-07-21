# Markwise — Student Exam Performance Predictor

End-to-end machine learning project that predicts a student’s **maths score** from reading/writing scores and background features. Includes a Flask web UI (**Markwise**) for interactive predictions, with **Docker** and **Render** deployment support.

## Features

- Data ingestion, transformation, and model training pipeline
- Multiple regression models with hyperparameter tuning (GridSearchCV)
- Saved preprocessor + best model artifacts for inference
- Web app to enter student details and get an estimated maths score
- Dockerized app with Gunicorn for production
- Ready to deploy on Render

## Tech stack

- **Python**, pandas, NumPy
- **scikit-learn**, XGBoost
- **Flask** + **Gunicorn**
- **Docker**
- HTML / CSS / JavaScript (Markwise UI)

## Project structure

```
Machine_Learning_project/
├── app.py                      # Flask app (local debug)
├── application.py              # Flask app (deployment entry)
├── Dockerfile                  # Container image
├── .dockerignore
├── render.yaml                 # Render Blueprint
├── requirements.txt
├── setup.py
├── artifacts/                  # model.pkl, preprocessor.pkl, datasets
├── notebook/
│   └── data/stud.csv           # source dataset
├── src/
│   ├── components/
│   │   ├── data_ingestion.py
│   │   ├── data_transformation.py
│   │   └── model_trainer.py
│   ├── pipeline/
│   │   └── predict_pipeline.py
│   ├── exception.py
│   ├── logger.py
│   └── utils.py
├── static/                     # CSS / JS
└── templates/                  # HTML pages
```

## Setup

1. **Clone the repo** (or open the project folder).

2. **Create and activate a virtual environment** (recommended):

```bash
python -m venv venv
```

Windows (PowerShell):

```powershell
.\venv\Scripts\Activate.ps1
```

macOS / Linux:

```bash
source venv/bin/activate
```

3. **Install dependencies**:

```bash
pip install -r requirements.txt
```

## Train the model

From the project root:

```bash
python -m src.components.data_ingestion
```

This will:

1. Load `notebook/data/stud.csv`
2. Split into train/test sets under `artifacts/`
3. Fit the preprocessor and save `artifacts/preprocessor.pkl`
4. Train models, pick the best one, and save `artifacts/model.pkl`
5. Print the best model’s R² score

## Run the web app (local)

```bash
python app.py
```

Then open:

- Home: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
- Predict: [http://127.0.0.1:5000/predictdata](http://127.0.0.1:5000/predictdata)

Or production-style locally:

```bash
python application.py
```

## Run with Docker

Build the image:

```bash
docker build -t markwise-ml .
```

Run the container:

```bash
docker run -p 10000:10000 -e PORT=10000 markwise-ml
```

Open: [http://127.0.0.1:10000/](http://127.0.0.1:10000/)

## Deploy on Render (Docker)

1. Push this repo to **GitHub** (include `artifacts/model.pkl` and `artifacts/preprocessor.pkl`).
2. Go to [https://render.com](https://render.com) → sign in with GitHub.
3. Click **New +** → **Web Service** → select this repository.
4. Settings:

| Setting | Value |
|--------|--------|
| **Runtime** | Docker |
| **Branch** | `main` |
| **Dockerfile Path** | `./Dockerfile` |
| **Instance type** | Free (or higher) |

5. Click **Create Web Service** and wait for the build.
6. Open the live URL Render gives you (e.g. `https://markwise-ml.onrender.com`).

You can also use **Blueprint** deploy with the included `render.yaml`:

1. New + → **Blueprint**
2. Select the repo
3. Apply the `render.yaml` service

### Notes for Render

- Free tier may sleep after idle; the first request can take ~30–60 seconds.
- Prediction needs `artifacts/model.pkl` and `artifacts/preprocessor.pkl` in the repo image.
- The container starts with: `gunicorn ... application:application`

## How prediction works

1. User submits gender, ethnicity, parental education, lunch type, test prep, reading score, and writing score.
2. `CustomData` builds a one-row DataFrame.
3. The saved preprocessor transforms the input.
4. The saved model returns the predicted maths score.

## Dataset

Student performance data with features such as:

| Feature | Description |
|---------|-------------|
| `gender` | male / female |
| `race_ethnicity` | group A–E |
| `parental_level_of_education` | education level |
| `lunch` | standard / free/reduced |
| `test_preparation_course` | none / completed |
| `reading_score` | 0–100 |
| `writing_score` | 0–100 |
| `math_score` | target (0–100) |

## Notes

- Ensure `artifacts/model.pkl` and `artifacts/preprocessor.pkl` exist before using the predict page (run training if they are missing).
- Logs are written under the `logs/` folder.
