FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html research.html style.css me.jpg maneet-mehta-resume.pdf robots.txt /srv/
