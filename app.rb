require 'sinatra'
require 'json'
require 'mongo'
require 'bcrypt'

enable :sessions

DB = Mongo::MongoClient.from_uri('mongodb://gamer:zotzot@ds049288.mongolab.com:49288/uci-esports').db('uci-esports')

get '/register' do
	redirect 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=naswzupwph8vbzwgka4vqrcmbmjs7fu&redirect_uri=http://localhost:4567/token&scope=user_read'
end

get '/token' do
end

get '/channels' do
	results = DB['channels'].find.to_a

	channels = []
	results.each do |result|
		channels.push({'channel' => result['channel']})
	end

	channels.to_json
end

get '/' do
	File.read('public/index.html')
end