let activeIndex = 0;
const slides = document.querySelectorAll('article');
const sliderButtons = document.querySelectorAll('.slider-button');
const navImgs = document.querySelectorAll('#nav-galery-section img');

const handleLeftClick = () => {
	const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;
	const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
		nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

	currentSlide.dataset.status = 'after';

	nextSlide.dataset.status = 'becoming-active-from-before';

	setTimeout(() => {
		nextSlide.dataset.status = 'active';
		activeIndex = nextIndex;
	});
};

const handleRightClick = () => {
	const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;

	const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
		nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

	currentSlide.dataset.status = 'before';

	nextSlide.dataset.status = 'becoming-active-from-after';

	setTimeout(() => {
		nextSlide.dataset.status = 'active';
		activeIndex = nextIndex;
	});
};

function autoSlide() {
	setInterval(() => {
		handleRightClick();
	}, 4000);
}

const handleSliderButton = (e) => {
	//replace class of all buttons with class slider-button
	sliderButtons.forEach((button) => {
		if (button.classList.contains('fa-play')) {
			button.classList.replace('fa-play', 'fa-pause');
			autoSlide();
		} else if (button.classList.contains('fa-pause')) {
			button.classList.replace('fa-pause', 'fa-play');
			clearInterval(autoSlide);
		}
	});
};

sliderButtons.forEach((sliderButton) => {
	sliderButton.addEventListener('click', handleSliderButton);
});

//change slide if you click on the miniature
navImgs.forEach((img) => {
	img.addEventListener('click', function () {
		const id = this.getAttribute('id').slice(-1);
		const currentSlide = document.querySelector(
			`[data-index="${activeIndex}"]`
		);
		currentSlide.dataset.status = 'inactive';
		const nextSlide = document.querySelector(`[data-index="${id}"]`);
		nextSlide.dataset.status = 'active';
		activeIndex = id;
	});
});
