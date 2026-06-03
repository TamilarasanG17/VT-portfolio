
  document.addEventListener("DOMContentLoaded", () => {
    // Select the updated about section
    const aboutSection = document.querySelector('.about-section');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // When the section enters the viewport
        if (entry.isIntersecting) {
          // Remove the 'hidden' class to trigger the CSS transitions
          entry.target.classList.remove('hidden');
          // Stop observing after the reveal is complete
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15 // Triggers when 15% of the section is visible
    });

    // Start observing the section
    if (aboutSection) {
      observer.observe(aboutSection);
    }
  });


document.addEventListener("DOMContentLoaded", () => {
    // Select all category containers
    const skillCategories = document.querySelectorAll('.skill-category');

    // Create an intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay based on the index to stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 150); // 150ms delay per category
                
                // Stop observing once the animation has triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    // Attach observer to each category
    skillCategories.forEach(category => {
        observer.observe(category);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Limits selection strictly to inside our project section container
    const cards = document.querySelectorAll(".projects-section .project-card");

    const observerOptions = {
        root: null, 
        threshold: 0.05, 
        rootMargin: "0px 0px -40px 0px" 
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Cascading delay effect for cards currently scrolling onto display
                setTimeout(() => {
                    entry.target.classList.add("animate-in");
                }, index * 90); 
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".coding-profiles-section .cp-count");
  const speed = 40; 

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    let count = 0;
    
    const increment = Math.max(Math.ceil(target / speed), 1);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count + suffix;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target + suffix;
      }
    };
    
    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          startCounter(counter);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((counter) => observer.observe(counter));
});
document
    .getElementById("contactForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        try {

            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (result.success) {
                alert("Email sent successfully!");
                document.getElementById("contactForm").reset();
            } else {
                alert("Failed to send email");
            }

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    });