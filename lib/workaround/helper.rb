require 'mail'

module Workaround
  module App
    module Helper
      def valid_email?(email)
        email =~ /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
      end

      def valid_size?(size)
        %w(XS S M L).include?(size.upcase)
      end

      # FIXME: @author aboyon
      def validate_form(params = {})
        errors = []
        errors << "Completa todos los campos" if params.select { |e| e.nil? || e.empty? }.any?
        errors << "No tenemos ese plan" unless valid_size?(params[:size])
        errors << "Tu email no esta bien" unless valid_email?(params[:email])
        Mail.defaults do
          delivery_method :smtp, {
            :address => "smtp.gmail.com",
            :port => 587,
            :user_name => ENV['NOTIFICATION_FROM_MAIL_ACCOUNT'],
            :password => ENV['NOTIFICATION_MAIL_PASSWORD'],
            :authentication => :plain,
            :enable_starttls_auto => true
          }
        end
        form = OpenStruct.new(
          :valid?   => errors.empty?,
          :errors   => errors,
          :params => params,
          :mail  => Mail.new {
            from     ENV['NOTIFICATION_FROM_MAIL_ACCOUNT'],
            to       ENV['NOTIFICATION_TO_MAIL_ACCOUNT']
            cc       ENV['NOTIFICATION_RECIPIENTS']
            subject  'Mensaje desde pagina'
            body     "#{params[:name]} (#{params[:email]}), escribio este mensaje: \n #{params[:message]}"
          }
        )
      end
    end
  end
end