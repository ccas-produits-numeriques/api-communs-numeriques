# Allow customization of the base Metabase version
FROM metabase/metabase:v0.63.14.2

# Copy CA certificates
COPY --from=ghcr.io/ccas-produits-numeriques/sij_ca-certificates /usr/local/share/ca-certificates /certificates

ENV USE_SYSTEM_CA_CERTS=true

RUN /__cacert_entrypoint.sh echo "Metabase with custom CA certificates"
