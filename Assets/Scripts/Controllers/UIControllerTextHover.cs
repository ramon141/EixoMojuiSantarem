using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;

public class UIControllerTextHover : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    public Color hoverColor; // cor que o texto deve mudar para quando o mouse estiver sobre ele

    private Text text; // referência para o componente Text do objeto
    private Color originalColor; // cor original do texto

    public void Start()
    {
        text = GetComponent<Text>(); // obtém referência para o componente Text do objeto
        originalColor = text.color; // armazena a cor original do texto
    }

    public void OnPointerEnter(PointerEventData pointerEventData)
    {
        text.color = hoverColor; // muda cor do texto para a cor especificada
    }

    public void OnPointerExit(PointerEventData pointerEventData)
    {
        text.color = originalColor; // volta a cor original do texto
    }
    
    public void OnPointerClick(PointerEventData pointerEventData)
    {
        SceneManager.LoadScene("Fase 1");
    }
}



