# Use an official Ruby runtime as a parent image
FROM ruby:3.1.2

# Set environment variables
ENV RAILS_ENV=development
ENV RACK_ENV=development

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Set up the working directory
WORKDIR /app

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install the required gems
RUN bundle install

# Copy the rest of the application code
COPY . .

# Precompile assets (if needed)
RUN bundle exec rake assets:precompile

# Expose the port on which the app runs
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
