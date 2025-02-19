<?php

include_once 'assets/files/bdd.php';

session_start();
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_email']) || $_SESSION['user_role'] !== 'teacher') {
    header("Location: index.html");
    exit();
}

include_once 'assets/files/teacher_info.php';

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Espace Professeur</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<header class="header pb-5 mb-5">
    <?php include 'header.php'; ?>
</header>

<div class="container my-5">
    <h1 class="text-center mb-4">Bienvenue, <?php echo htmlspecialchars($user_name); ?> !</h1>
    <div class="row">
        <div class="col-lg-6 col-md-12 mb-4">
            <h2>Cours du jour</h2>
            <form method="POST" action="assets/files/teacher_tools.php">
                <button type="submit" class="btn btn-primary mb-3">Lancer la vérification des présences</button>
            </form>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Heure</th>
                        <th>Classe</th>
                        <th>Matière</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($schedule as $entry): ?>
                        <tr>
                            <td><?php echo date("H:i", strtotime($entry['start_datetime'])); ?> - <?php echo date("H:i", strtotime($entry['end_datetime'])); ?></td>
                            <td><?php echo htmlspecialchars($entry['class_name']); ?></td>
                            <td><?php echo htmlspecialchars($entry['subject_name']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div class="col-lg-6 col-md-12 mb-4">
            <h2>Signatures de Présence</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($signatures as $signature): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($signature['firstname'] . ' ' . $signature['surname']); ?></td>
                            <td><?php echo htmlspecialchars(ucfirst($signature['status'])); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div class="col-lg-6 col-md-12 mb-4">
            <h2>Classes et Élèves</h2>
            <ul class="list-group">
                <?php foreach ($classes as $class_name => $students): ?>
                    <li class="list-group-item" onclick="toggleClass('<?php echo addslashes($class_name); ?>')">
                        <strong><?php echo htmlspecialchars($class_name); ?></strong>
                    </li>
                    <?php foreach ($students as $student): ?>
                        <li class="list-group-item student-row d-none" data-class="<?php echo addslashes($class_name); ?>">
                            <?php echo htmlspecialchars($student['firstname'] . ' ' . $student['surname']); ?>
                        </li>
                    <?php endforeach; ?>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    function toggleClass(className) {
        const elements = document.querySelectorAll(`.student-row[data-class='${className}']`);
        elements.forEach(el => el.classList.toggle('d-none'));
    }
</script>
</body>
</html>
