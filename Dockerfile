FROM nginx
#创建html文件
RUN mkdir /html 

#创建in文件
RUN mkdir /html/in

#拷贝nginx到 容器的nginx里
COPY ./nginx.conf /etc/nginx/conf.d

#拷贝当前文件的in到容器里
COPY . /html/in

RUN rm /etc/nginx/conf.d/default.conf

#开放80端口
EXPOSE 80