 <?php
 $config_file = __DIR__ . "/assets/config.json";
 if (!file_exists($config_file)) {
   die("Error: Configuration file not found.");
 }

 $config = json_decode(file_get_contents($config_file), true);
 if (json_last_error() !== JSON_ERROR_NONE) {
   die("Error: Failed to parse configuration file.");
 }

 if (!isset($config["apiUrl"])) {
   die("Error: 'apiUrl' not found in the configuration file.");
 }

 $current_url =
   (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] === "on" ? "https" : "http") .
   "://{$_SERVER["HTTP_HOST"]}{$_SERVER["REQUEST_URI"]}";

 $category_slug = null;
 $post_slug = null;
 if (preg_match('/\/post\/([^\/]+)\/([^\/]+)$/', $current_url, $matches)) {
   $category_slug = $matches[1];
   $post_slug = $matches[2];
 }

 if ($category_slug && $post_slug) {
   $api_url_base = rtrim($config["apiUrl"], "/");
   $api_url = "{$api_url_base}/wp-json/custom/v1/posts/{$category_slug}/{$post_slug}";

   $curl = curl_init();
   curl_setopt_array($curl, [
     CURLOPT_URL => $api_url,
     CURLOPT_RETURNTRANSFER => true,
     CURLOPT_TIMEOUT => 10,
     CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
   ]);
   $response = curl_exec($curl);
   if (curl_errno($curl)) {
     $error_msg = curl_error($curl);
     curl_close($curl);
     die("Error fetching data: $error_msg");
   }
   curl_close($curl);
   $post_data = json_decode($response, true);
   if (isset($post_data["title"]) && isset($post_data["content"])) {
     $og_title = $post_data["title"];
     $og_description = strip_tags(substr($post_data["excerpt"] ?? "", 0, 160));
     $og_image =
       $post_data["thumbnail"]["url"] ?? "{$api_url_base}/default-image.png";
     $og_url = "{$api_url_base}/post/{$category_slug}/{$post_slug}";
   } else {
     die("Error: Invalid data returned from the API.");
   }
 } else {
   $og_title = $config["default_title"] ?? "Default Title";
   $og_description = $config["default_description"] ?? "Default Description";
   $og_image =
     $config["default_image"] ?? "{$config["apiUrl"]}/default-image.png";
   $og_url = $config["siteUrl"] ?? $config["apiUrl"];
 }
  ?>
