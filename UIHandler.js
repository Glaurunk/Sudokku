export class UIHandler
{
    constructor()
    {
        this.selected = '0';
        this.buttons = Array.from(document.getElementsByClassName('number'));
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e)=> { 
                this.highlightSelected(e.target);
                this.selected = btn.dataset.value;
            })
        });
        this.cells = Array.from(document.getElementsByClassName('cell'));
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (this.selected != '0' && this.selected != '-1' && cell.dataset.tempvalue == '0') 
                {
                    cell.dataset.tempvalue = this.selected;
                    cell.firstChild.innerHTML = this.selected;
                    this.selected = '0';
                    this.buttons.forEach(btn => btn.classList.remove('selected'));
                }    
                else if (this.selected == '-1' && cell.dataset.shown == '0') 
                {
                    cell.dataset.tempvalue = '0';
                    cell.firstChild.innerHTML = '';
                    this.selected = '0';
                    this.buttons.forEach(btn => btn.classList.remove('selected'));
                }
            });
        })
    }

    highlightSelected(el)
    {
        this.buttons.forEach(btn => btn.classList.remove('selected'));
        el.classList.add('selected');
    }





}