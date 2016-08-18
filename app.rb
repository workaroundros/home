$:.push File.expand_path("lib", File.dirname(__FILE__))

require "cuba" 
require "cuba/render" 
require 'tilt'
require "erb"
require 'json'
require 'workaround/helper'

Cuba.plugin Cuba::Render
Cuba.plugin Workaround::App::Helper
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
      res.headers['Content-Type'] = "application/json"
      response_body = {}

      on param("name"), param("email"), param("size"), param("message"), param("phone"), param('g-recaptcha-response') do |name, email, size, message, phone, captcha|
        
        form = validate_form({
          :name => name,
          :email => email,
          :size => size,
          :phone => phone,
          :message => message,
          :captcha => captcha
        })
        if form.valid?
          form.mail.deliver!
          status = 200
          res.headers['X-App-Response'] = "OK"
        else
          status = 422
          res.headers['X-App-Response'] = "ERROR"
          response_body[:error] = form.errors
        end
        res.status = status
        res.write response_body.to_json
      end

      on true do
        res.headers['X-App-Response'] = "ERROR"
        res.status = 422
        response = {:error => "Todos los campos son requeridos"}.to_json
        res.write response
      end
    end
  end
end