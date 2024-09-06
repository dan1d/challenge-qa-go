# Production Dockerfile for Backend
FROM registry.docker.com/library/ruby:3.2.2-slim

# Set working directory
WORKDIR /rails

# Install production dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install production gems
RUN bundle install --without development test

# Copy the application code
COPY . .

# Set production environment variables
ENV RAILS_ENV=production

# Expose the port and start the Rails server
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
