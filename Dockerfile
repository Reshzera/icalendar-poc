# Usar a imagem oficial do PostgreSQL
FROM postgres:latest

# Definir variáveis de ambiente padrão para o PostgreSQL
ENV POSTGRES_DB=icalendar-api
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

# Expõe a porta padrão do PostgreSQL
EXPOSE 5432

# Define o volume para persistência de dados
VOLUME [ "/var/lib/postgresql/data" ]

# O comando padrão inicializa um servidor PostgreSQL
CMD ["postgres"]
