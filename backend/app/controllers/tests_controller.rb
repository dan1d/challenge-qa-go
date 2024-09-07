# app/controllers/tests_controller.rb
class TestsController < ApplicationController
  def trigger_tests
    if $redis.exists?("trigger_tests_job_lock")
      render json: { message: "Tests are already running. Please wait for them to finish." }, status: :unprocessable_entity
    else
      TriggerTestsJob.perform_later
      render json: { message: "Tests started successfully." }, status: :ok
    end
  end
end
