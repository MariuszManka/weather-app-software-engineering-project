import configparser

class Utils: 
   API_PREFIX = '/api/v1/'
   SWAGGER_URL = '/swagger'
   API_URL = '/static/swagger.json'

   @staticmethod
   def API_KEY():
      config = configparser.ConfigParser()
      config.read('config.ini')
      return config['weatherappapi']['api']
      
  