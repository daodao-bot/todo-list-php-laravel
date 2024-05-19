# 使用 php:8.3-apache 作为基础镜像
FROM php:8.3-apache

# 安装 pdo_mysql 扩展
RUN docker-php-ext-install pdo_mysql

# 安装 composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

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

# 启用 apache 的 mod_rewrite 模块
RUN a2enmod rewrite

# 将 .htaccess 文件复制到 Apache 的文档根目录
COPY public/.htaccess /var/www/html/public/.htaccess

# 暴露端口
EXPOSE 80
