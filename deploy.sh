rm -rf build && \
cd ../frontend && \
npm run build && \
mv build ../backend && \
cd ../backend && \
gcloud config set project ava-yiran && \
gcloud --quiet app deploy ./app.yaml &&
git add -A && \
git commit -m "update deploy" && \
git push origin master

# gcloud app create
