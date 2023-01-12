using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


public class Gate : MonoBehaviour
{
    public string typeKey;
    public string toScene;
    private GameObject plate = null;
    private bool isOpen = false;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        float input = Input.GetAxisRaw("Submit");

        if (!isOpen)
        {
            if (input > 0 && plate != null)
            {
                if (UIKeyController.uikc.removeKey(typeKey))
                {
                    SceneManager.LoadScene(toScene);
                }
                else
                {
                    Debug.Log("Vai pegar a chave!!!!!!!!!!!");
                }
            }
        }
        else
        {
			isOpen = true;
        }
    }

    private void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.gameObject.tag == "Player")
        {
            gameObject.transform.Find("Question").GetComponent<SpriteRenderer>().enabled = true;
            plate = gameObject;
        }
    }

    public void OnTriggerExit2D(Collider2D collider)
    {
        if (collider.gameObject.tag == "Player")
        {
            if (plate != null)
            {
                gameObject.transform.Find("Question").GetComponent<SpriteRenderer>().enabled = false;
                plate = null;
            }
        }
    }

}
