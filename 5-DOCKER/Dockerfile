FROM ubuntu:16.04

#File Author / Maintainer
LABEL MAINTAINER="nagireddy"

#Update the repository sources list
RUN apt-get update

# install apache
RUN apt-get install apache2 -y

# install git
RUN apt-get install git -y

# clone git repo
RUN git clone https://github.com/NagireddyGuduru/javahome-app

#Working directory inside the container. Default working directory is / root
WORKDIR /javahome-app

#remove unwanted things here removing .git once checkout the code no need be in container so removing.intension is i want to maintain the image As minimal as possible
RUN rm -rf .git 

# copying files recursivly to apache server to host my application
RUN cp -Rf * /var/www/html/ 

#once done with copy remove code from working directory.
RUN rm -rf /javahome-app

#To access application from outside have to expose the port
EXPOSE 80

#uninstall git to keep the image as minimal as possible
RUN apt-get remove git -y

#start apache service
CMD ["apachectl", "-D","FOREGROUND"] 