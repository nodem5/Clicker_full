<?php
// Połączenie z bazą danych
$host = 'localhost';
$dbname = 'clicker_hub';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Błąd połączenia z bazą danych: " . $e->getMessage());
}

// Obsługa dodawania komentarza
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $author = $_POST['author'] ?? 'Anonim';
    $content = $_POST['content'] ?? '';
    $rating = $_POST['rating'] ?? 0;

    if (!empty($content) && $rating >= 1 && $rating <= 5) {
        $stmt = $pdo->prepare("INSERT INTO comments (author, content, rating, created_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$author, $content, $rating]);
    }
}

// Pobieranie pięciu losowych komentarzy
$stmt = $pdo->query("SELECT author, content, rating, created_at FROM comments ORDER BY RAND() LIMIT 5");
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Komentarze</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="assets/css/main.css" />
</head>
<body class="no-sidebar is-preload">
    <div id="page-wrapper">

        <!-- Header -->
        <section id="header">

            <!-- Logo -->
            <h1><a href="#">Clicker Hub</a></h1>
            <img src="images/logo.png" alt="Logo" style="max-width: 100px; display: block; margin: 0 auto;">

            <!-- Nav -->
            <nav id="nav">
                <ul>
                    <li><a href="opis.html">Opis projektu</a></li>
					<li><a href="hub_main.html">Home</a></li>
					<li><a href="hub_komentarze.php">Komentarze</a></li>
                </ul>
            </nav>

        </section>

        <!-- Main -->
        <section id="main">
            <div class="container">
                <article class="box post">
                    <header>
                        <h2>Komentarze</h2>
                    </header>

                    <!-- Wyświetlanie komentarzy -->
                    <?php if ($comments): ?>
                        <?php foreach ($comments as $comment): ?>
                            <blockquote>
                                <p><?= htmlspecialchars($comment['content']) ?></p>
                                <footer>
                                    <?= htmlspecialchars($comment['author']) ?>, Ocena: <?= $comment['rating'] ?>/5, <?= $comment['created_at'] ?>
                                </footer>
                            </blockquote>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>Brak komentarzy do wyświetlenia.</p>
                    <?php endif; ?>

                    <!-- Formularz dodawania komentarza -->
                    <form method="POST" action="">
                        <div>
                            <label for="author">Autor:</label>
                            <input type="text" name="author" id="author" placeholder="Twoje imię" />
                        </div>
                        <div>
                            <label for="content">Treść komentarza:</label>
                            <textarea name="content" id="content" placeholder="Twój komentarz" required></textarea>
                        </div>
                        <div>
                            <label for="rating">Ocena (1-5):</label>
                            <input type="number" name="rating" id="rating" min="1" max="5" required />
                        </div>
                        <div>
                            <button type="submit">Dodaj komentarz</button>
                        </div>
                    </form>

                    <!-- Przycisk wylosowania innych komentarzy -->
                    <form method="GET" action="">
                        <div style="text-align: center; margin: 20px 0;">
                            <button type="submit">Wylosuj inne komentarze</button>
                        </div>
                    </form>

                    <!-- Wyświetlanie komentarzy -->
                    <?php if ($comments): ?>
                        <?php foreach ($comments as $comment): ?>
                            <blockquote>
                                <p><?= htmlspecialchars($comment['content']) ?></p>
                                <footer>
                                    <?= htmlspecialchars($comment['author']) ?>, Ocena: <?= $comment['rating'] ?>/5, <?= $comment['created_at'] ?>
                                </footer>
                            </blockquote>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>Brak komentarzy do wyświetlenia.</p>
                    <?php endif; ?>

                </article>
            </div>
        </section>

        <!-- Footer -->
        <section id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12">

                        <!-- Copyright -->
                        <ul class="copyright">
                            <li>&copy; Clicker Hub. Wszelkie prawa zastrzeżone.</li>
                            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                            <li>Twórca: Nodem5</li>
                        </ul>

                    </div>
                </div>
            </div>
        </section>

    </div>
</body>
</html>