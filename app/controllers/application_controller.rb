class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def default_url_options
    { host: ENV["DOMAIN"] || "localhost:3000" }
  end

  def getMapBoxApiKey
    render plain: ENV['MAPBOX_API_KEY']
  end
end
