require 'sinatra'
require 'json'
require 'mongo'
require 'bcrypt'

enable :sessions

DB = Mongo::MongoClient.from_uri('mongodb://gamer:zotzot@ds049288.mongolab.com:49288/uci-esports').db('uci-esports')


#redirects
#get '/' do
#	redirect '/streams/featured'
#end
#
#get '/streams' do
#	redirect '/streams/featured'
#end

#auth

#main
get '/*' do
	File.read('public/index.html')
end