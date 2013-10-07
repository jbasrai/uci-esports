require 'sinatra'
require 'json'
require 'mongo'
require 'bcrypt'
require 'net/http'
require 'net/http/persistent'
require 'uri'

#temporary fix
require 'openssl'
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
#temporary fix


enable :sessions

DB = Mongo::MongoClient.from_uri('mongodb://gamer:zotzot@ds049288.mongolab.com:49288/uci-esports').db('uci-esports')

get '/register' do
	redirect 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=naswzupwph8vbzwgka4vqrcmbmjs7fu&redirect_uri=http://localhost:4567/token&scope=user_read'
end

get '/token' do
	#get access token
	http = Net::HTTP::Persistent.new
	post_uri = URI.parse("https://api.twitch.tv/kraken/oauth2/token")
	
	data = {
		"client_id" => "naswzupwph8vbzwgka4vqrcmbmjs7fu", 
		"client_secret" => "j67d3ma5tqxg22w2xwg2rrld4wmn221",
		"grant_type" => "authorization_code",
		"redirect_uri" => "http://localhost:4567/token",
		"code" => params["code"]
	}
	post = Net::HTTP::Post.new post_uri.path
	post.set_form_data data
	response = http.request post_uri, post
	body = JSON.parse(response.body)

	#get username
	get_uri = URI.parse("https://api.twitch.tv/kraken?oauth_token=" + body["access_token"])
	response = http.request get_uri
	body = JSON.parse(response.body)
	puts body
	username = body["token"]["user_name"]

	#insert username into database
	puts DB['channels'].find_one("channel" => username)
	if !DB['channels'].find_one("channel" => username)
		puts "INSERTING INTO DATABASE"
		DB['channels'].insert("channel" => username)
	end

	http.shutdown
end

get '/channels' do
	results = DB['channels'].find.to_a

	channels = []
	http = Net::HTTP::Persistent.new
	results.each do |result|
		uri = URI.parse('https://api.twitch.tv/kraken/streams/' + result['channel'])
		response = http.request(uri)
		body = JSON.parse(response.body)
		if body["stream"]
			body["channel"] = result["channel"]
			channels.push(body)
		end
	end
	http.shutdown
	channels.to_json
end

get '/' do
	File.read('public/index.html')
end