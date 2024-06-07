FROM python:3

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 3000

CMD [ "python", "-m","Adarsh" ]

# create network => docker network create primyMovieNetwork 

# docker build --no-cache  -t  tg-file-to-link-image .
# docker run --network=primyMovieNetwork -d --name tg-file-to-link-container tg-file-to-link-image  


# docker run -d --network=primyMovieNetwork cloudflare/cloudflared:latest tunnel run --token eyJhIjoiN2M5MmEzN2U0NWRlZDE5MDBjYTRkODZjMDJhZTViNTkiLCJ0IjoiOWE2MjQ4MWMtNmI5Mi00MDhlLWJiZmMtMTA4MTljMjA2NDQzIiwicyI6Ik1UWXlaakptTTJRdFlqVmxNeTAwTXpZeUxXSXlOMkl0WkdSa01XVTJORGd6T1dOayJ9
