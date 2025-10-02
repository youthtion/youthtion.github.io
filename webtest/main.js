async function loadPage(page)
{
	if(page === ""){
		return;
	}
	try{
		let header_html = `<div class="page-header"><img src="content/${page}/header.jpg"></div>`;
		document.getElementById("header").innerHTML = header_html;
	
		let content_res = await fetch(`content/${page}/index.html`);
		if (!content_res.ok) throw new Error("讀取失敗");
		let content_html = await content_res.text();
		document.getElementById("content").innerHTML = content_html;
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (page === "contact") {
			setupContactForm();
		}
	}
	catch (err){
		document.getElementById("content").innerHTML = `<p style="color:red">讀取失敗：${err.message}</p>`;
	}
}

function setupContactForm() {
	let form = document.getElementById("contact-form");
	if (!form) {
		return;
	}
	form.onsubmit = null; 
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		let formData = new FormData(form);
		fetch(form.action, {
			method: "POST",
			body: formData,
			mode: "no-cors"
		}).then(() => {
			form.reset();
			alert("您的訊息已送出");
		}).catch(err => {
			alert("送出時發生錯誤, 請稍後再試");
			console.error(err);
		});
	});
}

function bindPageLinks() {
	document.querySelectorAll("a[data-page]").forEach(link => {
		link.addEventListener("click", async e => {
			e.preventDefault();
			closeMenu();
			let page = e.currentTarget.getAttribute("data-page");
			if (!page) {
				return;
			}
			await loadPage(page);
		});
	});
}

window.addEventListener("DOMContentLoaded", async () => {
	await loadPage("home");
	bindPageLinks();

	let footer_res = await fetch(`shared/footer.html`);
	if (footer_res.ok){
		let footer_html = await footer_res.text();
		document.getElementById("footer").innerHTML = footer_html;
		
	    // 執行 footer.html 裡的 script
		let tempDiv = document.createElement('div');
		tempDiv.innerHTML = footer_html;
		tempDiv.querySelectorAll('script').forEach(oldScript => {
			let newScript = document.createElement('script');
			if(oldScript.src) {
				newScript.src = oldScript.src; // 外部 script
			}
			else {
				newScript.innerHTML = oldScript.innerHTML; // 內嵌 script
			}
			document.body.appendChild(newScript);
		});
		bindPageLinks();
	}
	
	let mql = window.matchMedia("(orientation: portrait)");
	mql.addEventListener("change", e => {
		if (!e.matches) {
			// 當切換成橫式 (landscape) 時觸發
			closeMenu();
		}
	});

	let hamburger = document.getElementById("hamburger");
	let sideMenu = document.getElementById("sideMenu");
	let overlay = document.getElementById("overlay");
	// 打開選單
	hamburger.addEventListener("click", () => {
		sideMenu.classList.toggle("active");
		overlay.classList.toggle("active");
	});
	// 點遮罩關閉 + 收起所有子選單
	overlay.addEventListener("click", closeMenu);
	// 事件委派：處理子選單展開/收起（一次只允許一個開啟）
	sideMenu.addEventListener("click", (e) => {
		let link = e.target.closest(".main-btn");
		if (!link) {
			return;
		}
		// li.has-submenu
		e.preventDefault();
		let item = link.parentElement;
		if (item.classList.contains("open")) {
			// 已開 → 收起
			item.classList.remove("open");
		}
		else {
			// 關閉其他已開啟的
			sideMenu.querySelectorAll(".has-submenu.open").forEach(li => {
				if (li !== item) li.classList.remove("open");
			});
			// 打開自己
			item.classList.add("open");
		}
	});

});

function closeMenu() {
	sideMenu.classList.remove("active");
	overlay.classList.remove("active");
}

function adjustMainMargin() {
	let header = document.querySelector("header");
	let main_header = document.getElementById("header");
	main_header.style.marginTop = header.offsetHeight + "px";
}

window.addEventListener("load", adjustMainMargin);
window.addEventListener("resize", adjustMainMargin);