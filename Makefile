
build:
	docker build -t rentalcars .
	docker run --name rentalcars -p 3000:3000 rentalcars

clean: 
	docker stop rentalcars
	docker rm rentalcars
	docker rmi rentalcars