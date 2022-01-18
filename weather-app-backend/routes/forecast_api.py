from flask import jsonify, request, Blueprint
import requests
import sys
sys.path.append("..") #For utils import error
from utils import Utils

#================ BLUEPRINT REGISTER ======================
FORECAST_API = Blueprint('forecast_api', __name__) # Creating Blueprint for forecast_api
#===========================================================

#===============BLUEPRINT RETURNING ========================
def get_forecast_blueprint():
    """Return the blueprint for the main app module"""
    return FORECAST_API
#===========================================================


#======================= ROUTES ===================================
@FORECAST_API.route('/forecast', methods=['GET'])
def forecast():
      """
         Returning weather forecast for next 3 days based on location provided in link.
         Query string params description:

         q {String} - Name of the city to which we want to predict the weather
         cnt - {Number} - Precision - number of timestamps, which will be returned in the API response.
      """
      #Default variables definition
      city_name = 'Warsaw'
      cnt=10

      #Checking args and assigning them to variables
      if request.args:
         args = request.args
         if 'q' in args:
            city_name = args.get('q')
         if 'cnt' in args:   
            cnt = args.get('cnt')

      #Build request, getting and returning data
      forecast_response = requests.get('https://api.openweathermap.org/data/2.5/forecast', params={'q': city_name, 'cnt': cnt, 'units': 'metric', 'lang':'pl', 'appid': Utils.API_KEY()})
      return jsonify(forecast_response.json())
#===========================================================
