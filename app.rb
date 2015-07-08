require 'sinatra'
require 'json'

set :public_folder, 'public'

get '/' do
  erb :index
end

post '/' do
  content_type :json
  command = params["command"][2..-1];
  begin
    io = IO.popen(command)
  rescue SystemCallError => e
    return {command: e}.to_json
  end
  if io
    response = io.read
    io.close
    
    {command: response}.to_json
  else
    io.close
    {command: ''}.to_json
  end
end
