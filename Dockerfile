# 使用 PHP 8.3 和 Nginx 的镜像作为基础
FROM webdevops/php-nginx:8.3

# 设置工作目录
WORKDIR /var/www/html

# 复制 composer.lock 和 composer.json 到工作目录
COPY composer.lock composer.json /var/www/html/

# 安装依赖
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader && rm -rf /root/.composer

# 复制项目文件到工作目录
COPY . /var/www/html/

# 生成 autoload 文件
RUN composer dump-autoload --no-scripts --no-dev --optimize

# 更改所有文件的所有权
RUN chown -R www-data:www-data /var/www/html

# 暴露端口
EXPOSE 80
