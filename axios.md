# 最佳实践

## application/x-www-form-urlencoded

```
	let bodyFormData = new FormData();
	for (let [key, value] of Object.entries(data)) {
		if (value != undefined && value != '') {
			bodyFormData.set(key, value);
		}
	}
request({
    url,
    method: 'POST',
    body: formData,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
  });
```

