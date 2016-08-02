require "cuba" 
require "cuba/render" 
require 'tilt'
require "erb"
require 'json'

Cuba.plugin(Cuba::Render)
Cuba.use Rack::Static, :root => "public", :urls => ["/js", "/css", "/images", "/fonts"]

Cuba.define do
  on get do
    on root do
      render("home")
    end

    on "about" do
      render("about")
    end
  end

  on post do
    on "contact" do

      on param("name"), param("email"), param("size"), param("message") do |name, email, size, message|
        res.write "#{user}:#{pass}"
      end

      on true do
        res.status = 422
        response = {:error => "Completa todos los datos."}.to_json
        res.write response
      end
    end
  end
end