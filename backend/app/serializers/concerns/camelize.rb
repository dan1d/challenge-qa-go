module Camelize
  extend ActiveSupport::Concern

  included do
    def attributes(*args)
      hash = super
      hash.transform_keys { |key| key.to_s.camelize(:lower) }
    end
  end
end
