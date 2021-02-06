rm -rf build && \
cd ../frontend && \
npm run build && \
mv build ../backend && \
cd ../backend && \
npm start
