
export default class Timerclock {
    constructor(timer, start, stop, reset) {
        this.timer = document.getElementById(`${timer}`);
        this.start = document.getElementById(`${start}`);
        this.stop = document.getElementById(`${stop}`);
        this.reset = document.getElementById(`${reset}`);
        this.h = 0;
        this.m= 0
        this.s= 0;
        this.mls= 0;
        this.timeStarted = 0
    }
    
    
    loading = () => {
        this.evento();
    }

    evento = () => {
        this.start.addEventListener('click', this.starting);
        this.stop.addEventListener('click', this.stoping);
        this.reset.addEventListener('click', this.reseting);
    }

    write = () => {
        let ht, mt, st, mlst;
        this.mls++
    
        if(this.mls > 99) {this.s++; this.mls = 0}
        if(this.s > 59) {this.m++; this.s = 0}
        if(this.m > 59) {h++; this.m = 0}
        if(this.h > 24) this.h=0;
    
        mlst = ('0' + this.mls).slice(-2);
        st = ('0' + this.s).slice(-2);
        mt = ('0' + this.m).slice(-2);
        ht = ('0' + this.h).slice(-2);
    
        this.timer.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
        
    }
    
    starting = () => {
        this.write();
        this.timeStarted = setInterval(this.write, 10);
        this.start.removeEventListener('click', this.starting);
        this.start.disabled = true;
        // remover listener del boton start
    }
    
    stoping = () => {
        clearInterval(this.timeStarted);
        this.start.addEventListener('click', this.starting)
        this.start.disabled = false;

        //volver a agregar listener al boton start
    }
    
    reseting = ()=> {
        clearInterval(this.timeStarted);
        this.timer.innerHTML = "00:00:00.00";
        this.h = 0; this.m= 0; this.s= 0; this.mls= 0;
        this.start.addEventListener('click', this.starting)
        this.start.disabled = false;
        //agregar a start el listener
    }
}




