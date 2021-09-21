//eu escrevi// python+flask(micro framework)+api


Example Application - Complimentr
This application is meant to be used with the Introduction to APIs course.

Use this on Glitch
Remix on Glitch

⚠️ Several students have reported that cloning erroneously sets up a default Glitch application. If this happens to you, in the Glitch app that is created choose Tools >> Extras >> Git Import and Export >> Import from GitHub when prompted enter craigsdennis/intro-to-apis-flask

Local Installation
Copy .env.example to .env and update it with your Twilio credentials.

Running the application
python -m venv .venv
source ./.venv/bin/activate
pip install -r requirements.txt
FLASK_ENV=development flask run
In Development mode
Run ngrok on port 5000
Visit your ngrok url!