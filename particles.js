/////////

class Particle {
	constructor(pos, r, mr) {
		this.pos = pos;
		this.r = r;
		this.mr = mr;

		this.vel = createVector(random(-1, 1), random(-1, 1));
	}

	update(ps, i) {
		let r = 50;
		let g = 50;
		let b = 50;

		this.pos.add(this.vel);

		if (this.pos.x < -10) {	this.pos.x = w; }
		if (this.pos.x > w + 10) {	this.pos.x = 0; }
		if (this.pos.y < -10) {	this.pos.y =　h; }
		if (this.pos.y > h + 10) {	this.pos.y = 0; }

		this.vel.x = constrain(this.vel.x + random(-spd, spd), -max, max);
		this.vel.y = constrain(this.vel.y + random(-spd, spd), -max, max);

		for (let j = i + 1; j < ps.length; j++) {
			let ang = atan2(this.pos.y - ps[j].pos.y, this.pos.x - ps[j].pos.x);
			let distance = dist(this.pos.x, this.pos.y, ps[j].pos.x, ps[j].pos.y);

			if (distance < this.r) {
				r = map(distance, 0, this.r, 0, random(80, 200));
				g = map(distance, 0, this.r, 0, random(80, 200));
				b = map(distance, 0, this.r, 0, random(80, 200));

				stroke(r, g, b, 100);
				strokeWeight(map(distance, 0, this.r, 10, 0));
				line(this.pos.x, this.pos.y, ps[j].pos.x, ps[j].pos.y);

				let force = map(distance, 0, this.r, 5, 0);
				this.vel.x += force * cos(ang);
				this.vel.y += force * sin(ang);
			}
		}

		let ang = atan2(this.pos.y - mouseY, this.pos.x - mouseX);
		let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);

		if (distance < this.r) {
			// stroke(map(distance, 0, this.r, 0, random(100, 255)), map(distance, 0, this.r, 0, random(100, 255)), map(distance, 0, this.r, 0, random(100, 255)));
			// strokeWeight(map(distance, 0, this.r, 5, 0));
			// line(this.pos.x, this.pos.y, mouseX, mouseY);
			let force = map(distance, 0, this.r, 50, 0);
			this.vel.x += force * cos(ang);
			this.vel.y += force * sin(ang);
		}

		fill(r, g, b,100);
		ellipse(this.pos.x, this.pos.y, 5, 5);
	}
}
