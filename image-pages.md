---
layout: "layouts/image-page.html"  # Adjust this if needed
pagination:
  data: collections.allImages
  size: 1
  alias: image
permalink: "/images/{{ image.src | slugify }}/index.html"
eleventyComputed:
  prevImage: "{{ pagination.href.previous }}"
  nextImage: "{{ pagination.href.next }}"
---
