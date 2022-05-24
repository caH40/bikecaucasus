export const login = `
<form class="auth__from" action="" id="auth__form">
<div class="auth__box" id="auth__nickname">
		<label for="">Nickname</label>
		<input class="auth__input" type="text" name="nickname" autocomplete="on"
				id="auth__input-nickname">
		<span class="validation" id="validation__nickname"></span>
</div>
<div class="auth__box" id="auth__password">
		<label for="">Password</label>
		<input class="auth__input" type="password" name="password" id="auth__input-password"
				autocomplete="on">
		<span class="validation" id="validation__password"></span>
</div>
<div class="auth__box auth__btn-box" data-id="s" id="auth__btn-box">
		<div class="auth__btn" id="auth__btn">Вход</div>
		<span class="validation validation-all" id="validation__all"></span>
</div>
<div id="remember-box"></div>

<svg class="svg__cross" width="20" height="19" viewBox="0 0 20 19" fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<line x1="1.21195" y1="18.2127" x2="18.1825" y2="1.24212" stroke="black" stroke-width="2" />
		<line x1="1.70711" y1="1.29291" x2="18.6777" y2="18.2635" stroke="black" stroke-width="2" />
</svg>
</form>
`;

export const registration = `
<form class="auth__from" action="" id="auth__form">
<div class="auth__box" id="auth__nickname">
		<label for="">Nickname</label>
		<input class="auth__input" type="text" name="nickname" autocomplete="on"
				id="auth__input-nickname">
		<span class="validation" id="validation__nickname"></span>
</div>
<div class="auth__box" id="auth__password">
		<label for="">Password</label>
		<input class="auth__input" type="password" name="password" id="auth__input-password"
				autocomplete="on">
		<span class="validation" id="validation__password"></span>
</div>
<div class="auth__box " id="auth__email">
		<label for="">e-mail</label>
		<input class="auth__input" type="email" name="e-mail" autocomplete="on" id="auth__input-email">
		<span class="validation" id="validation__email"></span>
</div>
<div class="auth__box auth__btn-box" id="auth__btn-box">
		<div class="auth__btn" id="auth__btn">Регистрация</div>
		<span class="validation validation-all" id="validation__all"></span>
</div>

<svg class="svg__cross" width="20" height="19" viewBox="0 0 20 19" fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<line x1="1.21195" y1="18.2127" x2="18.1825" y2="1.24212" stroke="black" stroke-width="2" />
		<line x1="1.70711" y1="1.29291" x2="18.6777" y2="18.2635" stroke="black" stroke-width="2" />
</svg>
</form>
`;

export const remember = `
<div class="auth__from" action="" id="auth__form">
<div class="auth__box " id="auth__email">
		<label for="">e-mail</label>
		<input class="auth__input" type="email" name="e-mail" autocomplete="on" id="auth__input-email">
		<span class="validation" id="validation__email"></span>
</div>
<div class="auth__box auth__btn-box" id="auth__btn-box">
		<div class="auth__btn" id="auth__btn">Сброс пароля</div>
		<span class="validation validation-all" id="validation__all"></span>
</div>
<div id="remember-box"></div>

<svg class="svg__cross" width="20" height="19" viewBox="0 0 20 19" fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<line x1="1.21195" y1="18.2127" x2="18.1825" y2="1.24212" stroke="black" stroke-width="2" />
		<line x1="1.70711" y1="1.29291" x2="18.6777" y2="18.2635" stroke="black" stroke-width="2" />
</svg>
</div>
`;

export const createNewPassword = `
<div class="auth__from" action="" id="auth__form">
<div class="auth__box " id="auth__password>
		<label for="">Новый пароль</label>
		<input class="auth__input" type="password" name="password" autocomplete="on" id="auth__input-password">
		<span class="validation" id="validation__password"></span>
</div>
<div class="auth__box auth__btn-box" id="auth__btn-box">
		<div class="auth__btn" id="auth__btn">Обновить</div>
		<span class="validation validation-all" id="validation__all"></span>
</div>
<div id="remember-box"></div>

<svg class="svg__cross" width="20" height="19" viewBox="0 0 20 19" fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<line x1="1.21195" y1="18.2127" x2="18.1825" y2="1.24212" stroke="black" stroke-width="2" />
		<line x1="1.70711" y1="1.29291" x2="18.6777" y2="18.2635" stroke="black" stroke-width="2" />
</svg>
</div>
`;

export const saved = `
<div class="auth__title" id="auth__title">
	<span class="auth__login" id="auth__login">Новый пароль сохранён</span>
</div>
<div class="auth__box">
<a class="auth__box" href="https://bike-caucasus.ru/">Перейти на сайт bike-caucasus.ru</a>
</div>
`;
