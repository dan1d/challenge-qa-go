# syntax = docker/dockerfile:1

# Stage 1: Base stage for common setup
ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# Set working directory
WORKDIR /rails

# Set environment variables
ENV RAILS_ENV="development" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle"

# Stage 2: Build stage to install gems and precompile assets
FROM base as build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config

# Copy Gemfile and Gemfile.lock for bundling
COPY Gemfile Gemfile.lock ./

# Install gems and clean up cache
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

RUN gem install rails -v 7.1.4

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Stage 3: Final stage for the app image
FROM base

# Install runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts (gems, app code) from the build stage
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Set permissions and run as non-root user
COPY ./bin/docker-entrypoint /rails/bin/docker-entrypoint

# Change permissions before switching to the non-root user
RUN chmod +x /rails/bin/docker-entrypoint

# Now switch to non-root user
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER rails:rails

# Entrypoint to prepare the database (can be customized)
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Expose the Rails server port
EXPOSE 3000

# Default command to start the server
CMD ["./bin/rails", "server"]
