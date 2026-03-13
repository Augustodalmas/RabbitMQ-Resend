FROM rabbitmq:3-management

# Expor portas padrão
EXPOSE 5672
EXPOSE 15672

# Usuário e senha padrão (apenas para estudo local)
ENV RABBITMQ_DEFAULT_USER=admin
ENV RABBITMQ_DEFAULT_PASS=admin

# Dados persistentes
VOLUME ["/var/lib/rabbitmq"]
