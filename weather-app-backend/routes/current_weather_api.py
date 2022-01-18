from flask import jsonify, request, Blueprint
import requests
import sys
sys.path.append("..") #For utils import error
from utils import Utils

#================ BLUEPRINT REGISTER ======================
CURRENT_WEATHER_API = Blueprint('current_weather_api', __name__) # Creating Blueprint for current_weather_api
#===========================================================

#===============BLUEPRINT RETURNING ========================
def get_current_weather_blueprint():
    """Return the blueprint for the main app module"""
    return CURRENT_WEATHER_API
#===========================================================


#======================= ROUTES ===================================
@CURRENT_WEATHER_API.route('/current-weather', methods=['GET'])
def current_weather():
      """
         Returning current weather based on location provided in link.
         Query string params description:

         q {String} - Name of the city to which we want to check the weather
      """
      #Default variables definition
      city_name = 'Warsaw'

      #Checking args and assigning them to variables
      if request.args:
         args = request.args
         if 'q' in args:
            city_name = args.get('q')

      #Build request, getting and returning data
      current_weather_response = requests.get('https://api.openweathermap.org/data/2.5/weather', params={'q': city_name, 'units': 'metric', 'lang':'pl', 'appid': Utils.API_KEY()})
      return jsonify(current_weather_response.json())
#===========================================================
