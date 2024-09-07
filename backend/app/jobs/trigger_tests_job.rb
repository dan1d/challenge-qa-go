class TriggerTestsJob < ApplicationJob
  queue_as :default

  LOCK_KEY = "trigger_tests_job_lock"
  LOCK_TIMEOUT = 10.minutes.to_i

  def perform
    return unless acquire_lock

    begin
      ActionCable.server.broadcast('test_status', { status: 'starting', message: 'Running tests...' })
      system("docker-compose -f docker-compose.production.yml run aqa > tmp/test_output.log")
      File.open('tmp/test_output.log', 'r') do |file|
        file.each_line do |line|
          ActionCable.server.broadcast('test_status', { status: 'running', message: line.strip })
        end
      end

      ActionCable.server.broadcast('test_status', { status: 'completed', message: 'Tests completed.' })
    ensure
      release_lock
    end
  end

  private

  def acquire_lock
    $redis.set(LOCK_KEY, true, nx: true, ex: LOCK_TIMEOUT)
  end

  def release_lock
    $redis.del(LOCK_KEY)
  end
end
