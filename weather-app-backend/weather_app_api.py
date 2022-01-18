from flask import Flask, json, jsonify
from werkzeug.exceptions import HTTPException

from utils import Utils 
from routes import forecast_api
from routes import current_weather_api
# from routes import raspberry_weather_api

APP = Flask(__name__) #APP INITIALIZATION

#================== BLUEPRINTS REGISTRATION =======================
APP.register_blueprint(forecast_api.get_forecast_blueprint(), url_prefix=Utils.API_PREFIX)
APP.register_blueprint(current_weather_api.get_current_weather_blueprint(), url_prefix=Utils.API_PREFIX)
# APP.register_blueprint(raspberry_weather_api.get_raspberry_weather_blueprint(), url_prefix=Utils.API_PREFIX)
#==================================================================


#======================== ERROR HANDLING ==========================
@APP.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "cod": e.code,
        "name": e.name,
        "message": e.description,
    })
    response.content_type = "application/json"
    return response
#==================================================================

# ========================= RUN APP ===============================
if __name__ == '__main__':
   APP.run(debug=True)
#===================================================================
