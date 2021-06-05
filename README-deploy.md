* Install the prerequisites:

```bash
apt-get install nginx memcached php-memcached php-fpm openjdk-11-jre
```

* Enable php support in the HTTP server:

```bash
vim /etc/nginx/sites-available/default

# uncomment lines marked with (!)

(!)        location ~ \.php$ {
(!)                include snippets/fastcgi-php.conf;
(!)
(!)                # With php-fpm (or other unix sockets):
(!)                fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
(!)        }

# bump the socket name from php7.0-fpm.sock to php7.2-fpm.sock
```

* Change pemissions on current folder

```bash
chown www-data .
```

* Reload the configuration:

```bash
service php7.2-fpm restart
service nginx restart
```
