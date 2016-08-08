FROM ruby:2.3.0-alpine
EXPOSE 9292
ENV DIR /workaround
RUN mkdir $DIR
WORKDIR $DIR
ADD Gemfile $DIR/
ADD Gemfile.lock $DIR/
RUN bundle install
ADD . $DIR/
CMD rackup -o '0.0.0.0' config.ru
