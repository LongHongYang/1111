$files = Get-ChildItem -Path "c:\Users\Administrator\Desktop\作业\毕设\html" -Recurse -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    $content = $content -replace "location.href='index.html'", "location.href='/1111/index.html'"
    $content = $content -replace "href=`"index.html`"", "href=`"/1111/index.html`""
    
    $content = $content -replace "location.href='article.html", "location.href='/1111/article.html"
    $content = $content -replace "href=`"article.html`"", "href=`"/1111/article.html`""
    
    $content = $content -replace "location.href='login.html'", "location.href='/1111/login.html'"
    $content = $content -replace "href=`"login.html`"", "href=`"/1111/login.html`""
    
    $content = $content -replace "location.href='register.html'", "location.href='/1111/register.html'"
    $content = $content -replace "href=`"register.html`"", "href=`"/1111/register.html`""
    
    $content = $content -replace "location.href='admin/", "location.href='/1111/admin/"
    $content = $content -replace "href=`"admin/", "href=`"/1111/admin/"
    
    $content = $content -replace "location.href='dashboard.html'", "location.href='/1111/admin/dashboard.html'"
    $content = $content -replace "location.href='articles.html'", "location.href='/1111/admin/articles.html'"
    $content = $content -replace "location.href='article-edit.html'", "location.href='/1111/admin/article-edit.html'"
    $content = $content -replace "location.href='categories.html'", "location.href='/1111/admin/categories.html'"
    $content = $content -replace "location.href='comments.html'", "location.href='/1111/admin/comments.html'"
    $content = $content -replace "location.href='users.html'", "location.href='/1111/admin/users.html'"
    $content = $content -replace "location.href='statistics.html'", "location.href='/1111/admin/statistics.html'"
    $content = $content -replace "location.href='profile.html'", "location.href='/1111/admin/profile.html'"
    
    Set-Content $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated: $($file.FullName)"
}

Write-Host "All files updated successfully!"