migrate:
	docker-compose -f docker-compose.development.yml exec backend ./bin/rails db:migrate

seed:
	docker-compose -f docker-compose.development.yml exec backend ./bin/rails db:seed

setup:
	docker-compose -f docker-compose.development.yml exec backend ./bin/rails db:setup
