<?php
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
      
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mohamedtarek241266@gmail.com'; 
        $mail->Password = ''; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

       
        $mail->SMTPDebug = 2; 
        $mail->Debugoutput = function($str, $level) {
            error_log("SMTP Debug: $str", 0);
        };

       
        $mail->setFrom($email, $name);
        $mail->addAddress('mohamedtarek241266@gmail.com'); 
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission from Proemirazone';
        $mail->Body = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
        ";
        $mail->AltBody = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nMessage: {$message}";

        $mail->send();
        $mail->clearAddresses(); 

        // Confirmation email to user
        $mail->setFrom('mohamedtarek241266@gmail.com', 'Proemirazone Team');
        $mail->addAddress($email, $name);
        $mail->Subject = 'Thank You for Contacting Proemirazone';
        $mail->Body = "
            <h2>Thank You, {$name}!</h2>
            <p>We have received your message and will get back to you soon.</p>
            <p><strong>Your Details:</strong></p>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
            <p>Best regards,<br>Proemirazone Team</p>
        ";
        $mail->AltBody = "Thank you, {$name}!\nWe have received your message and will get back to you soon.\n\nYour Details:\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nMessage: {$message}\n\nBest regards,\nProemirazone Team";

        $mail->send();

       header("Location: " . $_SERVER['PHP_SELF'] . "?success=1");
exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | Proemirazone</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
    <link href="css/contact.css" rel="stylesheet">
</head>

<body>
  <!-- Navigation -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="./index.html"><i class="fas fa-building"></i> Proemirazone</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
                <span class="navbar-toggler-icon"><span></span></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <button class="navbar-close" aria-label="Close navigation">
                    <i class="fas fa-times"></i>
                </button>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item" style="--index: 1;"><a class="nav-link" href="./companyFormation.html">Company Formation</a></li>
                    <li class="nav-item" style="--index: 2;"><a class="nav-link" href="./services.html">Services</a></li>
                    <li class="nav-item" style="--index: 3;"><a class="nav-link" href="./secretary.html">Secretary</a></li>
                    <li class="nav-item" style="--index: 5;"><a class="nav-link" href="#contact">Contact</a></li>
                    <li class="nav-item" style="--index: 6;"><a class="nav-link" href="./About.html">About Us</a></li>
                    <li class="nav-item" style="--index: 7;"><a class="nav-link active" href="./contact.php">Contact Us</a></li>
                    <li class="nav-item" style="--index: 8;"><a class="nav-link" href="./blog.html">Blog</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="contact">
        <div class="particles">
            <div class="particle" style="left: 10%; width: 8px; height: 8px; animation-delay: 0s;"></div>
            <div class="particle" style="left: 20%; width: 6px; height: 6px; animation-delay: 2s;"></div>
            <div class="particle" style="left: 30%; width: 10px; height: 10px; animation-delay: 4s;"></div>
            <div class="particle" style="left: 40%; width: 4px; height: 4px; animation-delay: 6s;"></div>
            <div class="particle" style="left: 50%; width: 8px; height: 8px; animation-delay: 8s;"></div>
            <div class="particle" style="left: 60%; width: 6px; height: 6px; animation-delay: 10s;"></div>
            <div class="particle" style="left: 70%; width: 12px; height: 12px; animation-delay: 12s;"></div>
            <div class="particle" style="left: 80%; width: 5px; height: 5px; animation-delay: 14s;"></div>
            <div class="particle" style="left: 90%; width: 7px; height: 7px; animation-delay: 16s;"></div>
        </div>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="hero-content" data-aos="fade-right">
                      
                        <h1>Get in Touch with Us</h1>
                        <p>Ready to start your business journey in the UAE or Oman? Contact our expert team for personalized guidance and support.</p>
                        <a href="#contact-form" class="btn btn-primary"><i class="fas fa-envelope"></i> Send a Message</a>
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    <!-- Contact Form and Info Section -->
    <section class="contact section" id="contact-form">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Contact Us</h2>
            <div class="row">
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <form action="contact.php" method="POST" id="contactForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="Your Email" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone</label>
                            <input type="tel" class="form-control" id="phone" name="phone" placeholder="Your Phone Number">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100"><i class="fas fa-paper-plane"></i> Send Message</button>
                        <div id="successMessage" class="success-message" style="display: none;">Your message has been sent successfully! A confirmation email has been sent to your inbox.</div>    </form>
                </div>
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="contact-info">
                        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                        <h4>Email</h4>
                        <p>hello@emirazone.com</p>
                    </div>
                    <div class="contact-info">
                        <div class="contact-icon"><i class="fas fa-phone"></i></div>
                        <h4>Phone</h4>
                        <p>+971 55 360 1944</p>
                    </div>
                    <div class="contact-info">
                        <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <h4>Address</h4>
                        <p>Silicon Oasis, Digital Park, Building A2, Dubai, United Arab Emirates</p>
                    </div>
                    <div class="social-icons">
                        <a href="https://www.facebook.com/profile.php?id=61575964558956" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://t.me/emirazone" target="_blank" aria-label="Telegram"><i class="fab fa-telegram-plane"></i></a>
                        <a href="https://www.instagram.com/emirazone/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/emirazone-business-consultancy/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="section" id="map">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">Find Us</h2>
            <div class="map-container" data-aos="fade-up" data-aos-delay="100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.693672896678!2d55.25245831500927!3d25.18114938391677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEwJzUyLjEiTiA1NcKwMTUnMTYuMSJF!5e0!3m2!1sen!2sae!4v1698765432109!5m2!1sen!2sae"
                    width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>© 2025 Proemirazone. All Rights Reserved.</p>
                </div>
                <div class="col-md-6">
                    <div class="footer-links">
                        <a href="#" style="color: var(--primary-color); margin: 0 15px;">Terms of Use</a>
                        <a href="#" style="color: var(--primary-color); margin: 0 15px;">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script src="js/contact.js"></script>
</body>

</html>